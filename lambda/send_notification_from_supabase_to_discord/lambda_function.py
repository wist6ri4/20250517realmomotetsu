import json
import os
import textwrap
from logging import getLogger, config
from datetime import datetime

import requests

# ログ設定
with open('logging.json', 'r', encoding="utf-8") as f:
    config_param = json.load(f)

config.dictConfig(config_param)
logger = getLogger(__name__)


def lambda_handler(event, context):
    """
    lambda_handler receives a POST request from Supabase Webhook.
    And then sends a message to Discord Webhook.
    """
    try:
        logger.info('Start AWS Lambda')

        # SupabaseのWebhookからのデータを取得
        record = (json.loads(event['body'])).get('record')
        logger.info('Received record: %s', record)
        if not record:
            logger.error('No record found in the event body')
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Invalid request'})
            }

        team_id = record['team_id']
        station_id = record['station_id']
        created_at = record['created_at']

        if not all([team_id, station_id, created_at]):
            logger.error('Missing required fields: %s', record)
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing required fields'})
            }

        # Discordのメッセージフォーマットに変換
        discord_message = {
            "content": textwrap.dedent(
                f"""
                現在地情報が登録されました：
                > チームID: {record['team_id']}\n\
                駅ID: {record['station_id']}\n\
                登録日時: {datetime.fromisoformat(created_at).strftime('%Y/%m/%d %H:%M:%S')}
                """)
        }

        # Discord Webhookに送信
        response = requests.post(os.getenv('DISCORD_WEBHOOK_URL'), json=discord_message, timeout=10)

        if response.status_code == 204:
            logger.info('Message sent to Discord successfully')
        else:
            logger.error(
                'Failed to send message to Discord. Status code: %s - %s',
                response.status_code,
                response.text
            )

        logger.info('Discord message: %s', discord_message)

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Message sent to Discord successfully'})
        }

    except Exception as e:
        logger.error('An error occurred: %s', e)
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal server error'})
        }
