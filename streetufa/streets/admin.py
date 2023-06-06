from django.contrib import admin
from . models import Street, District, Person, UserModel

admin.site.register(Street)
admin.site.register(District)
admin.site.register(Person)
admin.site.register(UserModel)
