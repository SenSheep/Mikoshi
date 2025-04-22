from django.db import models
from django.contrib.auth.models import User

class Character(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Привязка к пользователю
    name = models.CharField(max_length=50)
    role = models.CharField(max_length=50)  
    hp = models.IntegerField(default=0)
    stats = models.JSONField(default=dict)
    skills = models.JSONField(default=dict)
    armor = models.JSONField(default=dict)
    inventory = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    role_level = models.IntegerField(default=1)