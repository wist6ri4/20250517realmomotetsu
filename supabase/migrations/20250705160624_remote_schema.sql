CREATE TRIGGER "notify to discord" AFTER INSERT ON public.transit_stations FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://p1sjp7qtkb.execute-api.ap-northeast-1.amazonaws.com/default/send_from_supabase_to_discord_for_realmomotetsu', 'POST', '{"Content-type":"application/json"}', '{}', '5000');


