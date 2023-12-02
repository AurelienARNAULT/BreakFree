using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class Comm : MonoBehaviour
{
    void Start()
         {
             StartCoroutine(GetHelloWorld());
         }

         IEnumerator GetHelloWorld()
         {
             using (UnityWebRequest www = UnityWebRequest.Get("http://localhost:4123"))
             {
                 yield return www.SendWebRequest();

                 if (www.result == UnityWebRequest.Result.ConnectionError || www.result == UnityWebRequest.Result.ProtocolError)
                 {
                     Debug.LogError(www.error);
                 }
                 else
                 {
                     // Show the result in the console
                     Debug.Log(www.downloadHandler.text);
                 }
             }
         }
}
