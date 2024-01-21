using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ObjectManager : MonoBehaviour
{
    Collider roomCollider;
    GameObject roomCrimeTapes;
    GameObject fond;
    GameObject piece;


    void Start()
    {
        Debug.Log("ObjectManager Start");
        string nomSceneActuelle = SceneManager.GetActiveScene().name;
        try 
        {
            if (nomSceneActuelle == "MapScene")
            {
                roomCollider = GameObject.Find("ChambreCollider").GetComponent<Collider>();
                roomCrimeTapes = GameObject.Find("CrimeChambre");
            }
            else if (nomSceneActuelle == "PadloackScene")
            {
                Debug.Log("je cherche les ibjects ");
                fond = GameObject.Find("Fond");
                piece = GameObject.Find("Piece");
            }
        }
        catch (System.Exception)
        {
            Debug.Log("ObjectManager - Not in the map scene or objects not found");
        }
    }
        

    void Update()
    {
        if (Input.GetMouseButtonDown(0) || (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began))
        {
            Vector3 clickPosition = Vector3.zero;

            if (Input.GetMouseButtonDown(0))
            {
                clickPosition = Input.mousePosition;
            }
            else if (Input.touchCount > 0)
            {
                clickPosition = Input.GetTouch(0).position;
            }

            Ray ray = Camera.main.ScreenPointToRay(clickPosition);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit) && SocketManager.Instance.GetCurrentObject() != null)
            {
                GameObject clickedObject = hit.collider.gameObject;
                Debug.Log(clickedObject.tag);
                if (clickedObject.tag.ToLower() == "door" && SocketManager.Instance.GetCurrentObject().ToLower() == "key")
                {
                    SoundManager.Instance.PlayRiddleFinished();
                    clickedObject.GetComponent<DoorManager>().OpenDoor();
                    roomCollider.tag = "ChambreCollider";
                    roomCrimeTapes.SetActive(false);
                    SocketManager.Instance.SendSocket("removeObject", "{\"name\":\"" + SocketManager.Instance.GetCurrentObject() + "\"}");  
                }
                if (clickedObject.tag.ToLower() == "dicefond" && SocketManager.Instance.GetCurrentObject().ToLower() == "dice")
                {
                    SoundManager.Instance.PlayRiddleStep();
                    fond.GetComponent<CadenasClick>().ShowDice();
                    SocketManager.Instance.SendSocket("removeObject", "{\"name\":\"" + SocketManager.Instance.GetCurrentObject() + "\"}");
                }
                if (clickedObject.tag.ToLower() == "piecefond" && SocketManager.Instance.GetCurrentObject().ToLower() == "piece")
                {
                    SoundManager.Instance.PlayRiddleStep();
                    fond.GetComponent<CadenasClick>().ShowPiece();
                    SocketManager.Instance.SendSocket("removeObject", "{\"name\":\"" + SocketManager.Instance.GetCurrentObject() + "\"}");
                }
                else
                {
                    Debug.Log("Wrong object");
                    SoundManager.Instance.PlayWrongObject();
                    SocketManager.Instance.SendSocket("wrongObject", "{\"name\":\"" + SocketManager.Instance.GetCurrentObject() + "\"}");
                }
                SocketManager.Instance.SetCurrentObject(null);
            }
        }
    }
}
