
def get_model_object(model,kwargs):
    try:
        instance = model.objects.get(**kwargs)
        return instance
    except Exception as e:
        print(e)
        return False