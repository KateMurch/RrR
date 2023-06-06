from rest_framework import serializers
from .models import Street, District, Person, UserModel
from django.contrib.auth.models import User
# from django.contrib.auth import get_user_model


class StreetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Street
        fields = "__all__"


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = "__all__"


class PersonSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(max_length=None, use_url=True, allow_null=True, required=False)

    class Meta:
        model = Person
        fields = "__all__"


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['role']


class UserSerializer(serializers.ModelSerializer):
    usermodel = UserModelSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'last_name', 'first_name', 'username', 'email', 'password', 'usermodel']
        read_only_fields = ['id']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
