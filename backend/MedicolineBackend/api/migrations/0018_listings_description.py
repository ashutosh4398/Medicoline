# Generated by Django 3.1.2 on 2020-10-24 23:39

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20201025_0505'),
    ]

    operations = [
        migrations.AddField(
            model_name='listings',
            name='description',
            field=tinymce.models.HTMLField(blank=True, null=True),
        ),
    ]
