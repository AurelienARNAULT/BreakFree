using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI; 
using TMPro;
using SocketIOClient;

public class SocketChecking : MonoBehaviour
{
    public LayerMask Cubes;
    private Renderer[] socketRenderers;
    private List<string> cubesInOrder = new List<string> { "Cube1", "Cube2", "Cube3", "Cube4" };

    private AudioSource audioSource;
    private bool soundPlayed = false;

    public TextMeshProUGUI victoryText; // Référence au composant Text

    public SocketIOUnity socket;
    public string serverUrlLink = "http://localhost:3000";

    void Start()
    {
        var uri = new Uri(serverUrlLink);
        socket = new SocketIOUnity(uri);
        socket.Connect();
        socketRenderers = GetComponentsInChildren<Renderer>();
        audioSource = GetComponent<AudioSource>();

        // Assurez-vous que la référence Text est configurée dans l'inspecteur Unity
        if (victoryText == null)
        {
            Debug.LogError("Veuillez assigner le composant Text dans l'inspecteur Unity.");
        }
        else
        {
            // Désactivez le texte au début
            victoryText.gameObject.SetActive(false);
        }
    }

    void Update()
    {
        CheckWordOrder();
    }

    void CheckWordOrder()
    {
        bool wordInOrder = true;

        for (int i = 0; i < socketRenderers.Length; i++)
        {
            Transform socketTransform = socketRenderers[i].transform;

            RaycastHit hit;
            if (Physics.Raycast(socketTransform.position, Vector3.up, out hit, Mathf.Infinity, Cubes))
            {
                GameObject objetTouche = hit.collider.gameObject;
                string nomObjet = objetTouche.name;
                Debug.Log("Nom de l'objet détecté : " + nomObjet);

                if (nomObjet != cubesInOrder[i])
                {
                    wordInOrder = false;
                    break;
                }
            }
            else
            {
                wordInOrder = false;
                break;
            }
        }

        SetSocketsColor(wordInOrder ? Color.green : Color.red);

        if (wordInOrder && !soundPlayed)
        {
            PlaySuccessSound();
            ShowVictoryText(); // Affichez le texte de victoire
            soundPlayed = true;
            SendSocket("objectSentToPocket","RazorSendToPocket");
        }
    }

    void SetSocketsColor(Color color)
    {
        for (int i = 0; i < socketRenderers.Length; i++)
        {
            socketRenderers[i].material.color = color;
        }
    }

    void PlaySuccessSound()
    {
        if (audioSource != null && !audioSource.isPlaying)
        {
            audioSource.Play();
        }
    }

    void ShowVictoryText()
    {
        // Activez le texte de victoire
        victoryText.gameObject.SetActive(true);
    }

    public void SendSocket(string eventName, string body)
            {
                Debug.Log($"Message sent: {body}");
                Debug.Log($"Event name: {eventName}");
                socket.EmitAsync(eventName, body);
                socket.Dispose();
            }
}
