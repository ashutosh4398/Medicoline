from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomUser(AbstractUser):
    pass

class Patient(models.Model):
    pass

class Doctor(models.Model):
    pass

class Groups(models.Model):
    pass

class Posts(models.Model):
    pass

class Comments(models.Model):
    pass

class Notifications(models.Model):
    pass

class Business(models.Model):
    pass

class Listings(models.Model):
    pass