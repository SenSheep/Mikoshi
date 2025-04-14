from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('char_sheet/<int:character_id>/', views.char_sheet, name='char_sheet'),
    path('profile/', views.profile, name='profile'),
    path('create_char/', views.create_char, name='create_char'),
    path('api/save-char/', views.save_char, name='save_char'),
    path('api/get-char-skills/<int:char_id>/', views.get_char_skills, name='get_char_skills'),

]