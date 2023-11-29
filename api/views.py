from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets

from tienda.models import Categoria,Producto
from .serializers import CategoriaSerializer, ProductoSerializer


class IndexView(APIView):
    
    def get(self,request):
        lista_categorias = Categoria.objects.all()
        serializer_categoria = CategoriaSerializer(lista_categorias,many=True)
        return Response(serializer_categoria.data)

# Categorias:

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class CategoriaView(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
class CategoriaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    # lookup_url_kwarg  = 'categoria_id'
    serializer_class = CategoriaSerializer

class CategoriaCreateView(generics.CreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
# Productos:

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoCreateView(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer