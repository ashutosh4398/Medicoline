from django.db import models
from django.contrib.auth.models import AbstractUser
from tinymce.models import HTMLField
from django.utils.text import slugify


# Create your models here.
class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=100, unique=False)
    last_name = models.CharField(max_length=100, unique=False)
    mobile = models.CharField(max_length=10, null=True, blank=True)
    email = models.EmailField(max_length=100,unique=True)

    # setting the username field to email instead of username
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username']


class Groups(models.Model):
    disease_name = models.CharField(max_length = 100,blank=True)
    description = HTMLField(null=True, blank=True)
    # slug is used for better SEO at frontend
    slug = models.SlugField(default='',max_length=100,editable=True,blank=True)

    def save(self,*args,**kwargs):
        self.slug = slugify(value=self.disease_name)
        super().save(*args,**kwargs)

    def __str__(self):
        return f"{self.disease_name} - {self.slug}"

class Patient(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    groups = models.ManyToManyField(Groups,symmetrical=False)

class Specialization(models.Model):
    specialization_name = models.CharField(max_length = 100)

    def __str__(self):
        return f"{self.specialization_name}"

class Doctor(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    specialization = models.ForeignKey(Specialization,on_delete=models.CASCADE)
    groups = models.ManyToManyField(Groups,symmetrical=False)
    qualification_certificate = models.FileField(upload_to="doctor/")
    address = models.TextField(default='')
    def __str__(self):
        return f"{self.user.email} || {self.specialization.specialization_name}"




class Posts(models.Model):
    # post can be of two types => experience and question
    # The user needs to classify whether it's a question or experience
    TYPE = (
        ('experience','experience'),
        ('question','question')
    )

    # because even doctors can share some valuable information on groups
    posted_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    # since tinyMCE is integrated at frontend as well
    post = HTMLField()
    date = models.DateTimeField(auto_now_add=True)
    post_type = models.CharField(max_length=20, choices = TYPE, blank=True, null=True)

    # allows the user to share post only in a particular group
    group = models.ForeignKey(Groups, on_delete=models.CASCADE) 

    def __str__(self):
        return f"{self.id}"


class Comments(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    comment = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)
    # since doctors can also comment on a particular post
    commented_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_doctor = models.BooleanField(default=False)

class Notifications(models.Model):
    
    TYPE = (
        ('experience','experience'),
        ('comment','comment'),
        ('question','question')
    )   

    post = models.ForeignKey(Posts, on_delete = models.CASCADE)
    initiated_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    text = models.TextField()
    notification_type = models.CharField(max_length=100,default='',choices=TYPE)
    date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.text}"

class Business(models.Model):
    pass

class Listings(models.Model):
    pass