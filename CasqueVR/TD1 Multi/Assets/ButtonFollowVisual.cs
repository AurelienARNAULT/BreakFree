using System;
using SocketIOClient;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit;


public class ButtonFollowVisual : MonoBehaviour
{
    private XRBaseInteractable interactable;
    private bool messageSent = false;
    public SocketIOUnity socket;
    public string serverUrlLink = "http://localhost:3000";
    // Start is called before the first frame update
    void Start()
    {
        var uri = new Uri(serverUrlLink);
        socket = new SocketIOUnity(uri);
        socket.Connect();
        interactable = GetComponent<XRBaseInteractable>();
        interactable.hoverEntered.AddListener(Follow);
        
    }



    public void Follow(BaseInteractionEventArgs hover)
    {
        if (!messageSent)
        {
            string objectName = hover.interactable.gameObject.name;
            SendSocket("objectCatched",objectName);
            messageSent = true;
        }
        
    }

    public void SendSocket(string eventName, string body)
        {
            Debug.Log($"Message sent: {body}");
            Debug.Log($"Event name: {eventName}");
            socket.EmitAsync(eventName, body);
            socket.Dispose();
        }

    // Update is called once per frame
    void Update()
    {
        
    }
}
