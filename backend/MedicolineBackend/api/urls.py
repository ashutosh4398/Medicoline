from django.urls import path
import api.views as api_view

urlpatterns = [
    # general
    path('diseases/',api_view.ShowAllDiseasesView.as_view()),
    path('disease/<slug:slug>/',api_view.GroupDescriptionView.as_view()),
    path('test/',api_view.UserDetailsView.as_view()),

    path('post/',api_view.PostQuestionOrExperienceView.as_view()),

    # login
    path('login/',api_view.LoginView.as_view()),
    # patient
    path('patient/signup/',api_view.PatientSignupView.as_view()),
    path('patient/join/',api_view.JoinGroupView.as_view()),
    
]
