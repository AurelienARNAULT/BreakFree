using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectManager : MonoBehaviour
{
    public Collider roomCollider;

    public GameObject roomCrimeTapes;

    public SocketManager socketManager;

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

            if (Physics.Raycast(ray, out hit) && socketManager.GetCurrentObject() != null)
            {
                GameObject clickedObject = hit.collider.gameObject;

                Debug.Log(clickedObject.tag);
                if (clickedObject.tag== "Door" && socketManager.GetCurrentObject() == "Key")
                {
                    clickedObject.GetComponent<DoorManager>().OpenDoor();
                    roomCollider.tag = "ChambreCollider";
                    roomCrimeTapes.SetActive(false);
                    socketManager.SendSocket("objectUsed", "{\"name\":\"" + socketManager.GetCurrentObject() + "\"}");  
                }else
                {
                    Debug.Log("Wrong object");
                    socketManager.SendSocket("wrongObject", "{\"name\":\"" + socketManager.GetCurrentObject() + "\"}");
                }
                socketManager.SetCurrentObject(null);
            }
        }
    }
}
