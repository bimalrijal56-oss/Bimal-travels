from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('travels', '0012_alter_customers_image_alter_guide_image_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='guidecontact',
            old_name='discription',
            new_name='description',
        ),
    ]