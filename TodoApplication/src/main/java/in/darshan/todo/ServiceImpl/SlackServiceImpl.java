package in.darshan.todo.ServiceImpl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import in.darshan.todo.Services.SlacKServices;

@Service
public class SlackServiceImpl implements SlacKServices{
	
	 @Value("${slack.webhook.url}")
	    private String slackWebhookUrl;

	    private final RestTemplate restTemplate;

	    public SlackServiceImpl() {
	        this.restTemplate = new RestTemplate();
	    }

	@Override
	public String sendMessageToSlack(String message) {
		// TODO Auto-generated method stub
        SlackMessage slackMessage = new SlackMessage(message);
        
        try {
            String response = restTemplate.postForObject(
                slackWebhookUrl,
                slackMessage,
                String.class
            );
            return "Success: " + response; 
        } catch (Exception e) {
            return "Error sending to Slack: " + e.getMessage();
        }
		
	}
	
	private static class SlackMessage {
	    private final String text;

	    public SlackMessage(String text) {
	        this.text = text;
	    }

	    public String getText(){
	        return text;
	    }
	}

}
