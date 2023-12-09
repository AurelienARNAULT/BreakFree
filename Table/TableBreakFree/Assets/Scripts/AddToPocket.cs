using UnityEngine;
using Lean.Touch;

public class AddToPocket : MonoBehaviour
{
    private bool isTouching = false;
    private bool isPocketShowing = true;
    private float touchDuration = 0f;

    public GameObject pocketIconPrefab;
    private GameObject pocketIconInstance;

    private void Update()
    {
        if (isTouching)
        {
            Debug.Log("IsTouching");
            touchDuration += Time.deltaTime;
            if (touchDuration >= 3f)
            {
                ShowPocketIcon();
            }
        }
    }

    private void OnEnable()
    {
        LeanTouch.OnFingerDown += OnFingerDown;
        LeanTouch.OnFingerUp += OnFingerUp;

        pocketIconInstance = Instantiate(pocketIconPrefab);
        pocketIconInstance.SetActive(false);
    }

    private void OnDisable()
    {
        LeanTouch.OnFingerDown -= OnFingerDown;
        LeanTouch.OnFingerUp -= OnFingerUp;

        if (pocketIconInstance != null)
        {
            Destroy(pocketIconInstance);
        }
    }

    private void OnFingerDown(LeanFinger finger)
    {
        Debug.Log("OnFingerDown");

        // Raycast pour détecter si le doigt touche l'objet
        RaycastHit hit;
        Ray ray = Camera.main.ScreenPointToRay(finger.ScreenPosition);

        if (Physics.Raycast(ray, out hit) && hit.collider.gameObject == gameObject)
        {
            Debug.Log("You just tapped the object!");
            isTouching = true;

            // Position de l'icône à côté de l'objet
            Vector3 iconPosition = transform.position + transform.right * 50f; // Vous pouvez ajuster le décalage ici

            pocketIconInstance.transform.position = iconPosition;
        }
        else
        {
            // Cacher l'icône si le doigt ne touche ni l'objet ni l'icône
            HidePocketIcon();
        }
    }

    private void OnFingerUp(LeanFinger finger)
    {
        Debug.Log("OnFingerUp");
        isTouching = false;
        touchDuration = 0f;
    }

    private void ShowPocketIcon()
    {
        if (pocketIconInstance != null)
        {
            pocketIconInstance.SetActive(true);
            isPocketShowing = true;
        }
    }

    private void HidePocketIcon()
    {
        if (pocketIconInstance != null)
        {
            pocketIconInstance.SetActive(false);
            isPocketShowing = false;
        }
    }
}
