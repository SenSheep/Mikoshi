from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

from django.shortcuts import render, redirect
from .forms import RegistrationForm

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Перенаправляем пользователя на страницу входа
    else:
        form = RegistrationForm()
    return render(request, 'register.html', {'form': form})

from django.contrib.auth import logout
def logout_view(request):
    logout(request)
    return redirect('index')

from django.contrib.auth.decorators import login_required

@login_required
def char_sheet(request, character_id):
    character = get_object_or_404(Character, id=character_id, user=request.user)  
    return render(request, 'char_sheet.html', {'character': character})


from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Character

@login_required
def profile(request):
    characters = Character.objects.filter(user=request.user)  # Достаем персонажей пользователя
    return render(request, 'profile.html', {'characters': characters})

from django.shortcuts import render, redirect
from .forms import CharacterForm

@login_required
def create_char(request):
    if request.method == 'POST':
        form = CharacterForm(request.POST)
        if form.is_valid():
            character = form.save(commit=False)
            character.user = request.user  # Привязываем персонажа к пользователю
            character.save()
            return redirect('profile')  # Перенаправляем на список персонажей
    else:
        form = CharacterForm()
    return render(request, 'create_char.html', {'form': form})
