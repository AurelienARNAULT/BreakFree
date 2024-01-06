using UnityEngine;
using UnityEngine.SceneManagement;
using Lean.Touch;
using System.Collections.Generic; // Ajoutez cette ligne pour inclure l'espace de noms System.Collections.Generic

public class ClickSceneLoader : MonoBehaviour
{
    // D�finir le nom de la sc�ne que vous voulez charger
    public string sceneToLoad;

    void OnEnable()
    {
        // Abonnez-vous � l'�v�nement de clic de Lean Touch
        Debug.Log("OnEnable");
        LeanTouch.OnFingerDown += OnFingerTap;
    }

    void OnDisable()
    {
        Debug.Log("OnDisable");
        // D�sabonnez-vous de l'�v�nement lorsque le script est d�sactiv� ou d�truit
        LeanTouch.OnFingerDown -= OnFingerTap;
    }

    void OnFingerTap(LeanFinger finger)
    {
        Debug.Log("OnFingerTap");
        // Effectuer un raycast sur l'interface graphique
        List<UnityEngine.EventSystems.RaycastResult> results = LeanTouch.RaycastGui(finger.ScreenPosition);

        // V�rifier si le raycast a touch� quelque chose
        if (results != null && results.Count > 0)
        {
            // Chargez la nouvelle sc�ne
            SceneManager.LoadScene(sceneToLoad);
        }
    }
}
