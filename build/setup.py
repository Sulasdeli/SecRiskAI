import setuptools
try:
    # for pip >= 10
    from pip._internal.req import parse_requirements
    try:
        # for pip >= 20.0
        from pip._internal.network.session import PipSession
    except ModuleNotFoundError:
        # for pip >= 10, < 20.0
        from pip._internal.download import PipSession
except ImportError:
    # for pip <= 9.0.3
    from pip.req import parse_requirements
    from pip.download import PipSession

try:
    raw = parse_requirements('requirements.txt', session=PipSession())

    # pip >= 20.1 changed ParsedRequirement attribute from `req` to `requirement`
    install_reqs = []
    for i in raw:
        try:
            install_reqs.append(str(i.requirement))
        except AttributeError:
            install_reqs.append(str(i.req))
except Exception:
    install_reqs = []

setuptools.setup(
    name='RiskClassifier',
    version='20210218230338_89EAF4',
    description="BentoML generated model module",
    long_description="""# Generated BentoService bundle - RiskClassifier:20210218230338_89EAF4

This is a ML Service bundle created with BentoML, it is not recommended to edit
code or files contained in this directory. Instead, edit the code that uses BentoML
to create this bundle, and save a new BentoService bundle.

A prediction service exposing Scikit-learn models for Cybersecurity Risk Assessment""",
    long_description_content_type="text/markdown",
    url="https://github.com/bentoml/BentoML",
    packages=setuptools.find_packages(),
    install_requires=install_reqs,
    include_package_data=True,
    package_data={
        'RiskClassifier': ['bentoml.yml', 'artifacts/*']
    },
    entry_points={
        'console_scripts': [
            'RiskClassifier=RiskClassifier:cli',
        ],
    }
)
