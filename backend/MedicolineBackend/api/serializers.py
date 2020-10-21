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
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=100)

    # status indicates which account is logging in
    # because without this any patient can login into doctors account and 
    # vice-versa
    status = serializers.CharField(max_length=10)
    # status = ['patient','doctor','admin']

class ShowAllGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Groups
        fields = ['id','disease_name','slug']

class GroupDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Groups
        fields = ['id','description']
    