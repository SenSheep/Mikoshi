from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name='index'),  # Добавляем маршрут для главной страницы
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('char_sheet/<int:character_id>/', views.char_sheet, name='char_sheet'),
    path('profile/', views.profile, name='profile'),
    path('create_char/', views.create_char, name='create_char'),

]