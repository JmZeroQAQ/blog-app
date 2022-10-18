from django.shortcuts import render

def index(request):
    data = request.GET

    return render(request, "index.html")
