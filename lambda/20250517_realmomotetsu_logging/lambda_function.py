import json
from logging import getLogger, config

# ログ設定
with open('logging.json', 'r', encoding="utf-8") as f:
    config_param = json.load(f)

config.dictConfig(config_param)
logger = getLogger(__name__)

DEBUG = 'DEBUG'
INFO = 'INFO'
WARNING = 'WARNING'
ERROR = 'ERROR'
CRITICAL = 'CRITICAL'

def lambda_handler(event, context):
    """
    lambda_handler receives a POST request from Frontend.
    And then sends logs to AWS CloudWatch.
    """
    print(event)
    try:
        log_content = json.loads(event['body']).get('logContent')
        log_level = log_content.get('logLevel')
        log_message = log_content.get('logMessage')
        uuid = log_content.get('uuid')

        if not all([log_content, log_level, log_message]):
            logger.error('Missing required fields: %s', log_content)
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
                },
                'body': json.dumps({'message': 'Missing required fields'})
            }

        if log_level == DEBUG:
            logger.debug(log_message, extra={'uuid': uuid})
        elif log_level == INFO:
            logger.info(log_message, extra={'uuid': uuid})
        elif log_level == ERROR:
            logger.error(log_message, extra={'uuid': uuid})
        elif log_level == WARNING:
            logger.warning(log_message, extra={'uuid': uuid})
        elif log_level == CRITICAL:
            logger.critical(log_message, extra={'uuid': uuid})
        else:
            logger.error('Invalid log level: %s', log_level)
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'\
                },
                'body': json.dumps({'message': 'Invalid log level'})
            }

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
            },
            'body': json.dumps({'message': 'Log sent to CloudWatch successfully'})
        }

    except Exception as e:
        logger.error('An error occurred: %s', e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
            },
            'body': json.dumps({'message': 'Internal server error'})
        }
