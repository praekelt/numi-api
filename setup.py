from setuptools import setup, find_packages

setup(
    name="numi-api",
    version="0.0.0",
    url='http://github.com/praekelt/numi-api',
    license='BSD',
    description="Numi's HTTP API",
    long_description=open('README.md', 'r').read(),
    author='Praekelt Foundation',
    author_email='dev@praekeltfoundation.org',
    packages=find_packages() + ['twisted.plugins'],
    include_package_data=True,
    install_requires=[
       'twisted',
       'klein',
       'confmodel',
       'PyYAML',
       'jsonschema',
   ],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: POSIX',
        'Programming Language :: Python',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Topic :: Internet :: WWW/HTTP',
    ],
)
