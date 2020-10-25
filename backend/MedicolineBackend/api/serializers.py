from rest_framework import serializers
import api.models as models
from .utils import get_model_object

class PatientSignupSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()
    confirm_password = serializers.CharField()

    def validate_email(self,email):
        # checking for existing user with same email
        instance = get_model_object(models.CustomUser, {'email': email})
        if instance:
            raise serializers.ValidationError('Email address already taken',code=400)
        else:
            return email
    
    def validate(self,data):
        # checking if both the passwords are matched
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('Passwords not matched',code=400)
        return data

class DoctorSignupSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()
    phone = serializers.CharField()
    password = serializers.CharField()
    confirm_password = serializers.CharField()
    address = serializers.CharField()
    specialization = serializers.CharField()
    qualification_certificate = serializers.FileField()
    
    def validate_phone(self,phone):
        instance = get_model_object(models.CustomUser,{'mobile': phone})
        
        if instance:
            raise serializers.ValidationError('Phone already taken',code=400)
        return phone

    def validate_email(self,email):
        # checking for existing user with same email
        instance = get_model_object(models.CustomUser, {'email': email})
        if instance:
            raise serializers.ValidationError('Email address already taken',code=400)
        else:
            return email
    
    def validate(self,data):
        # checking if both the passwords are matched
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('Passwords not matched',code=400)
        return data

    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=100)

    # status indicates which account is logging in
    # because without this any patient can login into doctors account and 
    # vice-versa
    status = serializers.CharField(max_length=10)
    # status = ['patient','doctor','admin']

class ShowAllGroupsSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    posts = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    class Meta:
        model = models.Groups
        fields = ['id','disease_name','slug','members','posts','comments']
    
    def get_members(self,instance):
        return instance.patient_set.all().count()
    
    def get_posts(self,instance):
        return models.Posts.objects.filter(group=instance).count() 
    
    def get_comments(self,instance):
        return models.Comments.objects.filter(post__group=instance).count()

class GroupDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Groups
        fields = ['id','description']

class JoinGroupSerializer(serializers.Serializer):
    slug = serializers.SlugField(max_length = 100)

    # check if the disease exists in db
    def validate_disease_name(self,slug):
        instance = get_model_object(models.Groups, {'slug': slug})
        if instance:
            return slug
        raise serializers.ValidationError("Disease does not exists", 400)

class PostQuestionOrExperienceSerializer(serializers.ModelSerializer):
    disease_name = serializers.CharField(max_length=100,write_only=True)

    class Meta:
        model = models.Posts
        fields = ['post_type','post','disease_name']
        
    
    def create(self, validated_data):
        
        disease = get_model_object(models.Groups,{'disease_name__iexact': validated_data.get('disease_name')})
        
        if disease:
            try:
                instance = models.Posts.objects.create(
                    posted_by = self.context.get('user'),
                    post = validated_data.get('post'),
                    post_type = validated_data.get('post_type'),
                    group = disease
                )

                # now once the post is saved, we need to generate notifications
                notification = models.Notifications.objects.create(
                    post = instance,
                    initiated_by = self.context.get('user'),
                    text = f"{self.context.get('user').first_name} {self.context.get('user').last_name} has posted {instance.post_type} in '{instance.group.disease_name}' group. Please click to view.",
                    notification_type = instance.post_type
                )
                
                return instance
                
            except Exception as e:
                print(e)
                raise serializers.ValidationError(detail="server issue",code=500)
        raise serializers.ValidationError(detail="Disease not found",code=400)


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notifications
        fields = ['id','post','text','notification_type']

class ShowMyPostsSerializer(serializers.ModelSerializer):
    group = serializers.CharField(source="group.disease_name",read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)
    date = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.Posts
        fields = ['id','post','group','date','comments']

    def get_comments(self,instance):
        return instance.comments_set.all().count()
    
    def get_date(self,instance):
        return f"{instance.date.strftime('%d %B, %Y')}"

class ShowDetailedPostSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField(read_only = True)
    group = serializers.CharField(source="group.disease_name",read_only=True)
    posted_by = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = models.Posts
        fields = ['id','post','date','post_type','group','posted_by']

    def get_posted_by(self,instance):
        return f"{instance.posted_by.first_name} {instance.posted_by.last_name}"

    def get_date(self,instance):
        return f"{instance.date.strftime('%d %B, %Y')}"

class PostCommentSerializer(serializers.ModelSerializer):
    post_id = serializers.CharField()
    commented_by = serializers.SerializerMethodField(read_only=True)
    date = serializers.SerializerMethodField(read_only=True)
    
    
    class Meta:
        model = models.Comments
        fields = ['id','post_id','comment','commented_by','date','is_doctor']
    
    def get_commented_by(self,instance):
        return f"{instance.commented_by.first_name} {instance.commented_by.last_name}"
    
    def get_date(self,instance):
        return f"{instance.date.strftime('%d %B, %Y')}"
    

    
    def create(self,validated_data):
        user = self.context.get('user')
        post = get_model_object(models.Posts,{'id': validated_data.get('post_id')})
        
        if post:
            try:
                is_doctor = False
                # check who is commenting
                doctor = get_model_object(models.Doctor, {'user': user})
                
                if doctor:
                    is_doctor = True
                
                comment = models.Comments.objects.create(
                    post = post,
                    comment = validated_data.get('comment'),
                    commented_by = user,
                    is_doctor = is_doctor
                )

                # now once the post is saved, we need to generate notifications
                notification = models.Notifications.objects.create(
                    post = post,
                    initiated_by = self.context.get('user'),
                    text = f"{self.context.get('user').first_name} {self.context.get('user').last_name} has posted comment in '{post.group.disease_name}' group. Please click to view.",
                    notification_type = 'comment'
                )

                return comment
            except Exception as e:
                print(e)
                raise serializers.ValidationError(detail="some error",code=400)
        
        raise serializers.ValidationError(detail='Post not found',code=400)


class ListingSignupSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Listings
        fields = ['id','listing_name','services','country','state','city','description']
    
    def create(self, validated_data):
        user = self.context.get('user')
        business = get_model_object(models.Business, {'user': user})
        if business:
            try:
                listing = models.Listings.objects.create(
                    business = business,
                    listing_name = validated_data.get('listing_name'),
                    services = validated_data.get('services'),
                    country = validated_data.get('country'),
                    state = validated_data.get('state'),
                    city = validated_data.get('city'),
                    description = validated_data.get('description')
                )

                return listing
            except Exception as e:
                
                raise serializers.ValidationError(detail='already exists',code=400)
        raise serializers.ValidationError(detail="business account not found",code=400)