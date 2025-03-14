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
def list_char(request):
        return render(request, 'list_char.html', {
    })