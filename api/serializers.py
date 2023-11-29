from rest_framework import serializers

from tienda.models import Categoria,Producto

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'
        
class ProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())

    class Meta:
        model = Producto
        fields = '__all__'

    def create(self, validated_data):
        categoria = validated_data.pop('categoria')
        producto = Producto.objects.create(categoria=categoria, **validated_data)
        return producto