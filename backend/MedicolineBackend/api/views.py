from django.shortcuts import render
# imported models
import api.models as models
# token authentication
from rest_framework.authtoken.models import Token

from rest_framework.permissions import AllowAny

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import api.serializers as api_ser

from django.contrib.auth import authenticate
from rest_framework.parsers import JSONParser,FormParser, MultiPartParser

from api.utils import get_model_object 

# Create your views here.
class PatientSignupView(APIView):
    """ Creates account for patient """

    serializer_class = api_ser.PatientSignupSerializer
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # now first create a custom user object
            user = models.CustomUser.objects.create_user(
                username = serializer.validated_data.get('email'),
                first_name = serializer.validated_data.get('first_name'),
                last_name = serializer.validated_data.get('last_name'),
                email = serializer.validated_data.get('email'),
                password = serializer.validated_data.get('password')
            )

            # create a patient instance
            patient = models.Patient.objects.create(user = user)

            # create a token
            token = Token.objects.create(user=user)

            return Response(data={'success': 'patient created successfully'}, status=status.HTTP_201_CREATED)


        return Response(serializer.errors)

class DoctorSignupView(APIView):
    serializer_class = api_ser.DoctorSignupSerializer
    parser_classes = [FormParser,MultiPartParser,JSONParser]
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # create customuser instance
            custom_user = models.CustomUser.objects.create_user(
                first_name = 'Dr.' + serializer.validated_data.get('first_name'),
                last_name = serializer.validated_data.get('last_name'),
                mobile = serializer.validated_data.get('phone'),
                email = serializer.validated_data.get('email'),
                username = serializer.validated_data.get('email'),
                password = serializer.validated_data.get('password'),
                is_active = False
            )

            # get specialization instance
            specialization = get_model_object(models.Specialization,{'specialization_name__iexact': serializer.validated_data.get('specialization')})
            if specialization:


                # creating doctor instance
                doctor = models.Doctor.objects.create(
                    user = custom_user,
                    specialization = specialization,
                    qualification_certificate = serializer.validated_data.get('qualification_certificate'),
                    address = serializer.validated_data.get('address')
                )
                # create token
                token = Token.objects.create(user=custom_user)

                return Response(data={'success': 'doctor created successfully'}, status=status.HTTP_201_CREATED)
            
            # delete instance if something goes wrong
            custom_user.delete()
            return Response({'error': 'Specialization not found'},status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors)


class SpecializationView(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        temp = [x.specialization_name for x in models.Specialization.objects.all()]
        return Response(temp)

class LoginView(APIView):
    """ Logs in all the entities """

    serializer_class = api_ser.LoginSerializer
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            user = authenticate(email=serializer.validated_data.get('email'),
                                password = serializer.validated_data.get('password')
                            )
            status = serializer.validated_data.get('status')
            if user:
                # grab token
                token,_ = Token.objects.get_or_create(user=user)
                if status == 'patient':
                    instance = get_model_object(models.Patient,{'user': user})
                    if instance:
                        return Response({
                            'token': token.key
                        })
                elif status == 'doctor':
                    instance = get_model_object(models.Doctor,{'user': user})
                    if instance:
                        return Response({
                            'token': token.key
                        })
                elif status == 'admin':
                    if user.is_superuser:
                        return Response({
                            'token': token.key
                        })
                elif status == 'business':
                    # TODO: Need to add business login once completed
                    pass
                
                
            return Response({'error': 'Account not found'},status=400)
        return Response(serializer.errors)

class ShowAllDiseasesView(APIView):
    """ Returns list of diseases """
    permission_classes = [AllowAny]
    serializer_class = api_ser.ShowAllGroupsSerializer

    def get(self,request):
        # sort the queryset in alphabetical order of disease name
        queryset = models.Groups.objects.all().order_by('disease_name')
        serializer = self.serializer_class(instance=queryset,many=True)
        return Response(serializer.data)

class GroupDescriptionView(APIView):
    """ Returns description of the specified disease """

    permission_classes = [AllowAny]
    serializer_class = api_ser.GroupDescriptionSerializer

    def get(self,request,slug):
        # get the requested dieases
        disease = get_model_object(models.Groups,{'slug': slug})
        if disease:
            serializer = self.serializer_class(instance=disease)
            return Response(serializer.data)
        return Response({'error': 'Not fount'},status=status.HTTP_400_BAD_REQUEST)

class UserDetailsView(APIView):
    """ Returns details of the logged in patient """
    def get(self,request):
        # preparing queryset
        patient = get_model_object(models.Patient,{'user': request.user})
        if patient:
            serialized = api_ser.ShowAllGroupsSerializer(patient.groups.all(),many=True)
            return Response({
                'username': f"{request.user.first_name} {request.user.last_name}",
                'groups': serialized.data,
                'settings': {
                    'first_name': request.user.first_name,
                    'last_name': request.user.last_name,
                    'email': request.user.email
                }
            })
        
        doctor = get_model_object(models.Doctor, {'user': request.user})
        if doctor:
            groups = doctor.groups.all()
            serializer = api_ser.ShowAllGroupsSerializer(groups,many=True)
            return Response({
                'username': f"{request.user.first_name} {request.user.last_name}",
                'groups': serializer.data,
                'settings': {
                    'first_name': request.user.first_name,
                    'last_name': request.user.last_name,
                    'email': request.user.email
                }
            })

class JoinGroupView(APIView):
    """ Allows the user to join a particular group """
    serializer_class = api_ser.JoinGroupSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # now we need to get the disease/group object
            group = get_model_object(models.Groups, 
                        {'slug': serializer.validated_data.get('slug')})
            if group:
                # get patient instance
                patient = get_model_object(models.Patient,{'user': request.user})
                if patient:
                    # add the patient to that particular group
                    patient.groups.add(group)
                    return Response(data={'success': {
                        'id': group.id,
                        'disease_name': group.disease_name,
                        'slug': group.slug
                    }})
                return Response(data={'error': 'Patient not found'},status=status.HTTP_400_BAD_REQUEST)
            return Response(data={'error': 'Not found'},status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors)


class PostQuestionOrExperienceView(APIView):

    serializer_class = api_ser.PostQuestionOrExperienceSerializer
    def post(self,request):
        serializer = self.serializer_class(data=request.data,context={
            'user': request.user
        })
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True})
        return Response(serializer.errors)

class ShowAllNotificationsView(APIView):

    serializer_class = api_ser.NotificationSerializer

    def get(self,request):
        # get patient instance
        patient = get_model_object(models.Patient,{'user': request.user})
        if patient:
            
            # get all the groups that the patient has subscribed
            groups = patient.groups.values('disease_name')
            groups = [x.get('disease_name') for x in groups]    
        
        doctor = get_model_object(models.Doctor,{'user': request.user})
        if doctor:
            groups = doctor.groups.values('disease_name')
            groups = [x.get('disease_name') for x in groups]    
        # get all the notifications where initated_by != request.user
        
        notifications = models.Notifications.objects.exclude(initiated_by = request.user)
        
        # check for notification groups
        notifications = notifications.filter(post__group__disease_name__in = groups).order_by('-date')
        if doctor:
            notifications = notifications.filter(notification_type = 'experience')
            
            
        
        serializer = self.serializer_class(instance=notifications,many=True)
        return Response(serializer.data)
        

class ShowAllQuestionsView(APIView):

    serializer_class = api_ser.NotificationSerializer
    
    def get(self,request):
        doctor = get_model_object(models.Doctor,{'user': request.user})

        if doctor:
            groups = doctor.groups.all()
            groups = [x.disease_name for x in groups]
            # get all posts of type question and present in same group as dr.
            questions = models.Posts.objects.filter(
                            post_type = 'question',
                            group__disease_name__in = groups
                        )
            # now check whether the dr. has previously commented
            temp = []
            for each in questions:
                if each.comments_set.filter(commented_by = request.user).exists():
                    temp.append(each)
            
            print(temp)
            notifications = models.Notifications.objects.exclude(post__in = temp).filter(notification_type='question')
            
            serializer = self.serializer_class(instance = notifications, many=True)
            return Response(serializer.data)
        
        return Response({'error': 'Not doctor account'},status=400)

        

class ShowMyPosts(APIView):

    serializer_class = api_ser.ShowMyPostsSerializer
    def get(self,request):
        posts = models.Posts.objects.filter(posted_by = request.user)
        serializer = self.serializer_class(instance=posts,many=True)
        return Response(serializer.data)


class ChangePasswordView(APIView):

    def put(self,request):
        new_password  = request.data.get('new_password')
        old_password = request.data.get('old_password')
        confirm_password = request.data.get('confirm_password')

        if (len(new_password.strip()) < 8) :
            return Response({'error': 'password less than 8'}, status=status.HTTP_400_BAD_REQUEST)
        
        elif (new_password != confirm_password):
            return Response({'error': 'passwords not matched'},status=status.HTTP_400_BAD_REQUEST)

        elif (not request.user.check_password(old_password)):
            return Response({'error': 'incorrect password'},status=status.HTTP_400_BAD_REQUEST)
        
        request.user.set_password(new_password)
        request.user.save()
        return Response({'success': 'password changed successfully'})


class ShowDetailedPostView(APIView):
    serializer_class = api_ser.ShowDetailedPostSerializer

    def get(self,request,post_id):
        # get Post instance
        post = get_model_object(models.Posts,{'id': post_id})
        serializer = self.serializer_class(instance=post)
        return Response(serializer.data)

class PostCommentView(APIView):
    serializer_class = api_ser.PostCommentSerializer

    def get(self,request,post_id=None):
        queryset = models.Comments.objects.filter(post__id = post_id).order_by('-is_doctor','-date')
        serializer = self.serializer_class(instance=queryset,many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = self.serializer_class(data=request.data,context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            queryset = models.Comments.objects.filter(post__id = serializer.validated_data.get('post_id')).order_by('-date')
            serializer = self.serializer_class(instance=queryset,many=True)
            return Response({'success': '1','comments': serializer.data})
        return Response(serializer.errors)

class StatisticsView(APIView):

    def get(self,request):
        pass