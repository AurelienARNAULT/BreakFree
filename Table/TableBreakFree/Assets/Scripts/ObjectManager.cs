using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectManager : MonoBehaviour
{
    Collider roomCollider;
    GameObject roomCrimeTapes;

    void Start()
    {
        roomCrimeTapes = GameObject.Find("CrimeChambre");
        roomCollider = GameObject.Find("ChambreCollider").GetComponent<Collider>();
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
                    clickedObject.GetComponent<DoorManager>().OpenDoor();
                    roomCollider.tag = "ChambreCollider";
                    roomCrimeTapes.SetActive(false);
                    SocketManager.Instance.SendSocket("removeObject", "{\"name\":\"" + SocketManager.Instance.GetCurrentObject() + "\"}");  
                }else
                {
                    Debug.Log("Wrong object");
                    SocketManager.Instance.SendSocket("wrongObject", "{\"name\":\"" + SocketManager.Instance.GetCurrentObject() + "\"}");
                }
                SocketManager.Instance.SetCurrentObject(null);
            }
        }
    }
}
