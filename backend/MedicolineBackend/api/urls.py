from django.urls import path
import api.views as api_view

urlpatterns = [
    # general
    path('diseases/',api_view.ShowAllDiseasesView.as_view()),
    path('disease/<slug:slug>/',api_view.GroupDescriptionView.as_view()),
    path('test/',api_view.UserDetailsView.as_view()),
    path('change/password/',api_view.ChangePasswordView.as_view()),
    
    path('comment/',api_view.PostCommentView.as_view()),
    path('comment/<int:post_id>/',api_view.PostCommentView.as_view()),

    
    path('post/',api_view.PostQuestionOrExperienceView.as_view()),
    path('post/<int:post_id>/',api_view.ShowDetailedPostView.as_view()),

    # login
    path('login/',api_view.LoginView.as_view()),
    # patient
    path('patient/signup/',api_view.PatientSignupView.as_view()),
    path('patient/join/',api_view.JoinGroupView.as_view()),
    path('patient/notifications/',api_view.ShowAllNotificationsView.as_view()),
    path('patient/posts/',api_view.ShowMyPosts.as_view()),

    # doctor
    path('doctor/signup/',api_view.DoctorSignupView.as_view()),
    path('doctor/specialization/',api_view.SpecializationView.as_view()),
    path('doctor/show-questions/',api_view.ShowAllQuestionsView.as_view()),

    
]
