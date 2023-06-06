from rest_framework import routers
from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)


router = routers.DefaultRouter()
router.register(r'streets', views.StreetViewSet)
router.register(r'districts', views.DistrictViewSet)
router.register(r'persons', views.PersonViewSet)
router.register(r'users', views.UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-token/', TokenObtainPairView.as_view()),
    path('api-token-refresh/', TokenRefreshView.as_view()),
    path('api-register/', views.RegisterView.as_view()),
    path('api-get-token/', views.get_csrf_token)
]
