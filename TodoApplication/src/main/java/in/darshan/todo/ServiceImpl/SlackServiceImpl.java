package in.darshan.todo.ServiceImpl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import in.darshan.todo.Services.SlacKServices;

@Service
public class SlackServiceImpl implements SlacKServices{
	
	private final String slackWebhookUrl = "https://hooks.slack.com/services/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";


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
