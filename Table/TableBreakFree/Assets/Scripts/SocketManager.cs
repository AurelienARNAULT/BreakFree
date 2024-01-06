using System;
using SocketIOClient;
using UnityEngine;
using TMPro;
using Newtonsoft.Json.Linq;

public class SocketManager : MonoBehaviour
{
    public SocketIOUnity socket;
    public string serverUrlLink = "http://localhost:3000";

    private string currentObject = null;

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

        socket.On("onObjectUsed", response =>
        {
            Debug.Log(response);
            try
            {
                // Analyser la réponse en tant que JArray
                JArray jsonArray = JArray.Parse(response.ToString());

                // Supposons que les données que vous souhaitez sont dans le premier élément du tableau
                JObject jsonObject = (JObject)jsonArray[0];

                string message = jsonObject["msg"].ToString();
                string contentString = jsonObject["content"].ToString();

                JObject contentObject = JObject.Parse(contentString);
                string name = contentObject["name"].ToString();

                Debug.Log("name : " + name);
                this.currentObject = name;
                Debug.Log("message : " + message);
            }
            catch (Exception ex)
            {
                Debug.LogError("Error parsing JSON: " + ex.Message);
            }
        });


        socket.Connect();
    }

    public void SendSocket(params string[] messages)
    {
        foreach (string message in messages)
        {
            socket.EmitAsync(message, message);
            Debug.Log($"Message sent: {message}");
        }
    }

    public void SendSocket(string eventName, string body)
    {
        socket.EmitAsync(eventName, body);
    }

    public string GetCurrentObject()
    {
        return this.currentObject;
    }

    public void SetCurrentObject(string currentObject)
    {
        this.currentObject = currentObject;
    }

    void OnDestroy()
    {
        if (socket != null)
        {
            socket.Dispose();
        }
    }

}
