from twisted.application.service import ServiceMaker


serviceMaker = ServiceMaker(
    'numi_api',
    'numi_api.service',
    "Worker for Numi HTTP API",
    'numi_api')
