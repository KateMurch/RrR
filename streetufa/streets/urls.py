from rest_framework import routers
from django.urls import path, include
from . import views


router = routers.DefaultRouter()
router.register(r'streets', views.StreetViewSet)
router.register(r'districts', views.DistrictViewSet)
router.register(r'persons', views.PersonViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
