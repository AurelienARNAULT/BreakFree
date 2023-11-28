using System;
using SocketIOClient;
using UnityEngine;
using TMPro;
using Newtonsoft.Json.Linq;

public class SocketManager : MonoBehaviour
{
    public SocketIOUnity socket;
    public string serverUrlLink = "http://localhost:3000";
    public TextMeshProUGUI messageText; 

    void Start()
    {
        var uri = new Uri(serverUrlLink);
        socket = new SocketIOUnity(uri);

        socket.OnConnected += (sender, e) =>
        {
            Debug.Log("socket.OnConnected");
        };

        socket.On("onMessage", response =>
        {
            Debug.Log("Event" + response.ToString());

            string messageBody = "";
            try
            {
                JArray jsonArray = JArray.Parse(response.ToString());

                messageBody = jsonArray[0].ToString();
            }
            catch (Exception ex)
            {
                Debug.LogError("Error parsing JSON: " + ex.Message);
            }

            Debug.Log(messageBody);

            if (messageText != null)
            {
                messageText.text = messageBody;
            }
        });


        socket.Connect();
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            socket.EmitAsync("newMessage", "Hello World!");
            Debug.Log("message sent");
        }
    }

    void OnDestroy()
    {
        socket.Dispose();
    }
}
