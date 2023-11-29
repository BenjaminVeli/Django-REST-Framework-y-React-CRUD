from django.urls import path,include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register(r'producto',views.ProductoViewSet,basename='producto')

urlpatterns = [
    path('',views.IndexView.as_view()),
    path('producto',views.ProductoView.as_view()),
    path('producto/crear/', views.ProductoCreateView.as_view()),
    path('producto/<int:pk>/', views.ProductoDetailView.as_view()),
    path('categoria',views.CategoriaView.as_view()),
    path('categoria/crear/', views.CategoriaCreateView.as_view()),
    path('categoria/<int:pk>/',views.CategoriaDetailView.as_view()),
    path('admin/',include(router.urls))
]
