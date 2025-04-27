import json
import os
import textwrap
from logging import getLogger, config

import requests

# ログ設定
with open('logging.json', 'r', encoding="utf-8") as f:
    config_param = json.load(f)

config.dictConfig(config_param)
logger = getLogger(__name__)

def lambda_handler(event, context):

    try:
        logger.info('Start AWS Lambda')

        body = json.loads(event['body'])
        logger.info('Received request_body: %s', body)

        # リクエストボディの検証
        if not body:
            logger.error('No data found in the event body')
            return response_message(400, {'message': 'No data found in the event body'})

        notification_type = body['type']
        data = body['data']
        message = {}

        # notification_typeの検証
        if notification_type == 'arrival':
            logger.info('Received arrival notification')
            team_id = data['team_id']
            team_name = data['team_name']
            station_id = data['station_id']
            station_name = data['station_name']

            if not all([team_id, team_name, station_id, station_name]):
                logger.error('Missing required fields: %s', body)
                return response_message(400, {'message': 'Missing required fields'})

            message = notify_arrival(team_name, station_name)

        elif notification_type == 'set_goal_station':
            logger.info('Received set_goal_station notification')
            station_id = data['station_id']
            station_name = data['station_name']

            if not all([station_id, station_name]):
                logger.error('Missing required fields: %s', body)
                return response_message(400, {'message': 'Missing required fields'})

            message = notify_set_goal_station(station_name)


        # Discord Webhookに送信
        response = requests.post(os.getenv('DISCORD_WEBHOOK_URL'), json=message, timeout=10)

        if response.status_code == 204:
            logger.info('Message sent to Discord successfully')
        else:
            logger.error(
                'Failed to send message to Discord. Status code: %s - %s',
                response.status_code,
                response.text
            )

        logger.info('Discord message: %s', message)
        return response_message(200, {'message': 'Notification sent successfully'})

    except Exception as e:
        logger.error('An error occurred: %s', e)
        return response_message(500, {'message': 'An error occurred', 'error': str(e)})


def response_message(status_code, message):
    """
    レスポンスを返す
    """
    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
        },
        'body': json.dumps(message)
    }


def notify_arrival(team_name, station_name):
    """
    Discordに通知する
    """
    discord_message = {
        "content": textwrap.dedent(
            f"""
            @everyone
            {team_name}が目的地の　{station_name}　に一番乗りで～～～～～す！\n\n\
            ミッション中の社長さんは中断、電車に乗っている社長さんは次の駅で降りてください！
            """)
    }

    return discord_message

def notify_set_goal_station(station_name):
    """
    Discordに通知する
    """
    discord_message = {
        "content": textwrap.dedent(
            f"""
            @everyone\n\
            社長のみなさん！\n\
            次の目的地が決定しました！\n\n\
            あたらしい目的地は　{station_name}　で～～～～～す！
            """)
    }

    return discord_message
