from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in open_vms/__init__.py
from open_vms import __version__ as version

setup(
	name="open_vms",
	version=version,
	description="Open sourece fleet management system",
	author="faruk",
	author_email="faruk.fa@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
