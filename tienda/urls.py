from django.urls import path

from . import views

app_name = 'tienda'

urlpatterns = [
    path('', views.index),
    path('producto',views.producto),
    path('categoria/<int:categoria_id>',views.categoria,name='categoria')
]