# Generated by Django 3.1.2 on 2020-10-24 23:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_listings_description'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='listings',
            unique_together={('business', 'listing_name')},
        ),
    ]
