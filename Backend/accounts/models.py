from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomerUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username
