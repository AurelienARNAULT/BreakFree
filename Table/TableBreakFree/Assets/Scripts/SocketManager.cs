using System;
using SocketIOClient;
using UnityEngine;
using TMPro;
using Newtonsoft.Json.Linq;

public class SocketManager : MonoBehaviour
{
    public SocketIOUnity socket;
    public string serverUrlLink = "http://localhost:3000";

    // Singleton pattern
    private static SocketManager instance;
    public static SocketManager Instance { get { return instance; } }

    void Awake()
    {
        if (instance != null && instance != this)
        {
            Destroy(this.gameObject);
            return;
        }
        else
        {
            instance = this;
        }

        DontDestroyOnLoad(this.gameObject);

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
        });

        socket.Connect();
    }

    public void SendSocket(params string[] messages)
    {
        foreach (string message in messages)
        {
            socket.EmitAsync("newMessage", message);
            Debug.Log($"Message sent: {message}");
        }
    }

    void OnDestroy()
    {
        if (socket != null)
        {
            socket.Dispose();
        }
    }

}
