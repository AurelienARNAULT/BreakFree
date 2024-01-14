using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SocketChecking : MonoBehaviour
{
    public LayerMask Cubes;
    private Renderer[] socketRenderers;
    private List<string> cubesInOrder = new List<string> { "Cube1", "Cube2", "Cube3", "Cube4" };

    private AudioSource audioSource;
    private bool soundPlayed = false; // Variable pour suivre si le son a déjà été joué

    void Start()
    {
        socketRenderers = GetComponentsInChildren<Renderer>();
        audioSource = GetComponent<AudioSource>();
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

                // Vérifiez si le cube est dans l'ordre correct
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

        // Changez la couleur des sockets en fonction de la validité du mot
        SetSocketsColor(wordInOrder ? Color.green : Color.red);

        // Jouez le son si le mot est dans l'ordre correct et que le son n'a pas encore été joué
        if (wordInOrder && !soundPlayed)
        {
            PlaySuccessSound();
            soundPlayed = true; // Marquez que le son a été joué
        }
    }

    void SetSocketsColor(Color color)
    {
        // Changez la couleur de tous les sockets
        for (int i = 0; i < socketRenderers.Length; i++)
        {
            socketRenderers[i].material.color = color;
        }
    }

    void PlaySuccessSound()
    {
        // Jouez le son à partir de l'AudioSource
        if (audioSource != null && !audioSource.isPlaying)
        {
            audioSource.Play();
        }
    }
}
