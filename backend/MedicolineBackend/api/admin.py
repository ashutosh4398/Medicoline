from django.contrib import admin

import api.models as models

# Register your models here.
admin.site.register(models.CustomUser)

admin.site.register([models.Groups,models.Patient])