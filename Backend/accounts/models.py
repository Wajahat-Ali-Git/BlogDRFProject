from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomerUser(AbstractUser):
    username = models.CharField(max_length=150)  # allow duplicates, spaces allowed
    email = models.EmailField(unique=True)  # email is unique and used for login
    bio = models.TextField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = "email"  # login field
    REQUIRED_FIELDS = ["username"]  # required for createsuperuser

    def __str__(self):
        return self.username
