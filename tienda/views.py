from django.shortcuts import render

from .models import Categoria,Producto
# Create your views here.
def index(request):
    lista_productos = Producto.objects.all()
    lista_categorias = Categoria.objects.all()
    
    context = {
        'productos':lista_productos,
        'categorias':lista_categorias
    }
    return render(request,'index.html',context)

def producto(request):
    return render(request,'producto.html')

def categoria(request,categoria_id):
    categoria = Categoria.objects.get(pk=categoria_id)
    lista_productos = categoria.producto_set.all()
    lista_categorias = Categoria.objects.all()
    
    context = {
        'productos':lista_productos,
        'categorias':lista_categorias,
        'categoria':categoria
    }
    
    return render(request,'index.html',context)