from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
# from django.contrib.auth import get_user_model


class Street(models.Model):
    street_name_ru = models.CharField(max_length=100, db_index=True)
    street_name_en = models.CharField(max_length=100, db_index=True)
    coordinates_0 = models.FloatField()
    coordinates_1 = models.FloatField()
    id_district = models.ForeignKey('District', on_delete=models.PROTECT)
    id_person = models.ForeignKey('Person', on_delete=models.PROTECT)

    def __str__(self):
        return self.street_name_ru


class District(models.Model):
    district_name_ru = models.CharField(max_length=100, db_index=True)
    district_name_en = models.CharField(max_length=100, db_index=True)

    def __str__(self):
        return self.district_name_ru


class Person(models.Model):
    person_name_ru = models.CharField(max_length=100, db_index=True)
    person_name_en = models.CharField(max_length=100, db_index=True)
    birth_date = models.IntegerField()
    death_date = models.IntegerField()
    content_ru = models.TextField()
    content_en = models.TextField(default="no_content")
    photo = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.person_name_ru


class UserModel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    class Role(models.IntegerChoices):
        U = 0, 'User'
        S = 1, 'Stuff'
    role = models.IntegerField(choices=Role.choices, default=Role.U)

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.user.username

    @receiver(post_save, sender=User)
    def create_userprofile(sender, instance, created, **kwargs):
        if created:
            UserModel.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_userprofile(sender, instance, **kwargs):
        instance.usermodel.save()
