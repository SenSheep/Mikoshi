from django.db import models
from django.contrib.auth.models import User

class Character(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Привязка к пользователю
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=[('netrunner', 'Netrunner'), ('solo', 'Solo'), ('tech', 'Tech')])  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
