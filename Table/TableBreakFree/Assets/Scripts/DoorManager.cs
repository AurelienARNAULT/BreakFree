using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DoorManager : MonoBehaviour
{
    public void OpenDoor()
    {
       this.gameObject.transform.position = new Vector3(1275f, 119f, 91f);
       this.gameObject.transform.rotation = Quaternion.Euler(-58.776f, -152.144f, -52.305f);
       this.gameObject.GetComponent<Collider>().enabled = false;
    }
}

