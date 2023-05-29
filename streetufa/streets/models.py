from django.db import models


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
